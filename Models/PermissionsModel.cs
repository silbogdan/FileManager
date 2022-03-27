using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FileManager.Models
{
    public class PermissionsModel
    {
        public string HostName { get; set; }
        public string Ip { get; set; }

        public PermissionsModel(string hostname, string ip)
        {
            this.HostName = hostname;
            this.Ip = ip;
        }
    }
}
