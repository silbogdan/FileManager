using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FileManager.Models
{
    [Serializable]
    public class RequestModel
    {
        [JsonPropertyName("path")]
        [JsonProperty(PropertyName = "path")]
        public string PathString { get; set; }

        [JsonPropertyName("content")]
        [JsonProperty(PropertyName = "content")]
        public string FileContent { get; set; }

        [JsonPropertyName("type")]
        [JsonProperty(PropertyName = "type")]
        public string FileType { get; set; }

        [JsonPropertyName("filename")]
        [JsonProperty(PropertyName = "filename")]
        public string FileName { get; set; }
        public RequestModel() { }
    }
}
