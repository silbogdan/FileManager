using System;
using System.Collections.Generic;

namespace FileManager.Models
{
    public partial class ServerData
    {
        public ServerData()
        {
            UserPermission = new HashSet<UserPermission>();
        }

        public int Id { get; set; }
        public string Ip { get; set; }
        public string Flavor { get; set; }
        public int Port { get; set; }
        public string HostName { get; set; }

        public virtual ICollection<UserPermission> UserPermission { get; set; }
    }
}
