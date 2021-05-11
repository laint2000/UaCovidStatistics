using Azure.Storage.Blobs;
using System;
using System.IO;
using System.Text;

namespace GetPravdaUaStats
{
    internal class AzureContainer
    {
        private BlobContainerClient _container;

        public AzureContainer(string connectionString, string azureContainterName)
        {
            _container = new BlobContainerClient(connectionString, azureContainterName);
            _container.CreateIfNotExists();
        }

        public async System.Threading.Tasks.Task UploadBlobStringAsync(string blobName, string text)
        {
            var contentStream = GetStream(text);

            var blob = _container.GetBlobClient(blobName);
            await blob.DeleteIfExistsAsync();
            await blob.UploadAsync(contentStream);
        }

        public static MemoryStream GetStream(string value)
        {
            return new MemoryStream(Encoding.UTF8.GetBytes(value ?? ""));
        }
    }
}