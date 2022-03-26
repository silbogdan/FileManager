using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FileManager.Models
{
    public class Command
    {
        [JsonPropertyName("command")]
        public string CommandType { get; set; }

        [JsonPropertyName("host")]
        public string Host { get; set; }
        
        [JsonPropertyName("req")]
        public RequestModel Request { get; set; }
    }
}
