using System;
using System.Collections.Generic;

namespace FileManager.Models
{
    public partial class UserData
    {
        public UserData()
        {
            UserPermission = new HashSet<UserPermission>();
        }

        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }

        public virtual ICollection<UserPermission> UserPermission { get; set; }
    }
}
