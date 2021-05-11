using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using Src.WebClient;

namespace GetPravdaUaStats
{
    public static class StatisticLoader
    {
        const string azureContainterName = "covid-stats";
        const string azureBlobName = "ukraine.json";

        [FunctionName("StatisticLoader")]

        // every day at 10:00:00 oclock
        public static async Task RunAsync([TimerTrigger("0 0 10 * * *" 
            #if DEBUG 
               ,RunOnStartup = true 
            #endif
            )] TimerInfo myTimer, ILogger log)
        {
            try
            {
                log?.LogInformation($"{DateTime.UtcNow} - Start download");

                var webClient = new WebClient();
                var resultJson = await webClient.DownloadString();
                log?.LogInformation($"{DateTime.UtcNow} - Download complete");

                var connectionString = GetConnectionString();
                var azureContainer = new AzureContainer(connectionString, azureContainterName);
                await azureContainer.UploadBlobStringAsync(azureBlobName, resultJson);

                log?.LogInformation($"Done");
            }
            catch (Exception e) {
                log?.LogError(e.Message);
            }
        }

        private static string GetConnectionString()
        {
            var result = System.Environment.GetEnvironmentVariable("AzureWebJobsStorage");
            if (string.IsNullOrEmpty(result)) throw new System.ArgumentNullException("AzureWebJobsStorage parameter is empty");
            return result;
        }

    }
}
