using Http;
using System;
using System.IO;

namespace DownloadUkraineJson
{
    class Program
    {
        private const string fileName = "ukraine.json";

        static void Main(string[] args)
        {
            Console.Write("Getting ukraine.json data.....");

            var http = new HttpRequest();
            var result = http.GetString().Result;

            File.WriteAllText(fileName, result);
            Console.WriteLine("Done");
            Console.WriteLine();
        }
    }
}
