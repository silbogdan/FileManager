using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using FileManager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace FileManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FileManager : ControllerBase
    {
        private static readonly HttpClient client = new HttpClient();
        //public Dictionary<string, string> requestsTypes = new Dictionary<string, string>
        //{
        //    {"get-items", "GET"},
        //    {"download", "GET"},
        //    {"delete", "POST"},
        //    {"create", "POST"},
        //    {"upload", "POST"}
        //};

        public Dictionary<string, string> requestsEndpoints = new Dictionary<string, string>
        {
            {"get-items", "/Files/GetItemsAtPath"},
            {"download", "/Files/DownloadFile"},
            {"delete", "/Files/UploadItem"},
            {"create", "/Files/DeleteItem"},
            {"upload", "/Files/CreateItem"}
        };

        [HttpPost("ExecuteCommand")]
        public IActionResult UploadItem([FromBody] Command command)
        {
            try
            {
                var httpWebRequest = (HttpWebRequest)WebRequest.Create($"https://localhost:44303{requestsEndpoints[command.CommandType]}w");
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    var json = JsonConvert.SerializeObject(command.Request);

                    streamWriter.Write(json);
                }

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var result = streamReader.ReadToEnd();
                    return Ok(result);
                }

            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}
