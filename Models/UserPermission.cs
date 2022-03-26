using System;
using System.Collections.Generic;

namespace FileManager.Models
{
    public partial class UserPermission
    {
        public int Id { get; set; }
        public int IdUser { get; set; }
        public int IdServer { get; set; }

        public virtual ServerData IdServerNavigation { get; set; }
        public virtual UserData IdUserNavigation { get; set; }
    }
}
