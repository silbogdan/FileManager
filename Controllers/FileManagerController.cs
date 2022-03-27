using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using FileManager.Helpers;
using FileManager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace FileManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    // [Authorize]
    public class FileManagerController : ControllerBase
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
            {"upload", "/Files/UploadItem"},
            {"delete", "/Files/DeleteItem"},
            {"create", "/Files/CreateItem"},
            {"find", "/Files/FindItem"},
            {"list-proc-sorted", "/Files/ListProcessesSorted"},
            {"list-proc", "/Files/ListProcesses"}
        };

        [HttpPost("ExecuteCommand")]
        public IActionResult ExecuteCommand([FromBody] Command command)
        {
            try
            {
                var httpWebRequest = (HttpWebRequest)WebRequest.Create($"http://20.111.40.3:80{requestsEndpoints[command.CommandType]}");
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                Console.WriteLine(httpWebRequest.Address.ToString());

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    var json = JsonConvert.SerializeObject(command.Request);

                    streamWriter.Write(json);
                    Console.WriteLine(json);
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
                Console.WriteLine(e.Message);
                return BadRequest();
            }
        }
    }
}
