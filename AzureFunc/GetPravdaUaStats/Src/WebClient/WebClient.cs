using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Src.WebClient
{
    class WebClient
    {
        public HttpMethod Method { get; set; }

        public async Task<string> DownloadString()
        {
            var clientHandler = new HttpClientHandler
            {
                AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate,
            };
            var client = new HttpClient(clientHandler);
            var request = GetUkraineJsonRequest();

            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();
                return body;
            }
        }
        private HttpRequestMessage GetUkraineJsonRequest()
        {
            return new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("https://cdn.pravda.com/cdn/covid-19/ukraine.json"),
                Headers =
                    {
                        { "user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36" },
                        { "accept", "application/json, text/plain, */*" },
                        { "accept-language", "uk,en-US;q=0.9,en;q=0.8,ru;q=0.7" },
                        { "cache-control", "no-cache" },
                        { "origin", "https://www.pravda.com.ua" },
                        { "pragma", "no-cache" },
                        { "referer", "https://www.pravda.com.ua/" },
                        { "sec-ch-ua", "\" Not A; Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"" },
                        { "sec-ch-ua-mobile", "?0" },
                        { "sec-fetch-dest", "empty" },
                        { "sec-fetch-mode", "cors" },
                        { "sec-fetch-site", "cross-site" },
                    }
            };
        }
    }
}
