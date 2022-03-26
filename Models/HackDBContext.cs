using System;
using FileManager.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Options;

namespace FileManager.Models
{
    public partial class HackDBContext : DbContext
    {
        private readonly AppSettings _appSettings;
        public HackDBContext()
        {
        }

        public HackDBContext(DbContextOptions<HackDBContext> options, IOptions<AppSettings> appSettings)
            : base(options)
        {
            _appSettings = appSettings.Value;
        }

        public virtual DbSet<ServerData> ServerData { get; set; }
        public virtual DbSet<UserData> UserData { get; set; }
        public virtual DbSet<UserPermission> UserPermission { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ServerData>(entity =>
            {
                entity.Property(e => e.Flavor)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.HostName)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Ip)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserData>(entity =>
            {
                entity.Property(e => e.Password)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserPermission>(entity =>
            {
                entity.HasOne(d => d.IdServerNavigation)
                    .WithMany(p => p.UserPermission)
                    .HasForeignKey(d => d.IdServer)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserPermi__IdSer__619B8048");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.UserPermission)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserPermi__IdUse__60A75C0F");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
