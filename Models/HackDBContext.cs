using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FileManager.Models
{
    public partial class HackDBContext : DbContext
    {
        public HackDBContext()
        {
        }

        public HackDBContext(DbContextOptions<HackDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ServerData> ServerData { get; set; }
        public virtual DbSet<UserData> UserData { get; set; }
        public virtual DbSet<UserPermission> UserPermission { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=tcp:hackitall-server.database.windows.net,1433;Initial Catalog=Hack-DB;Persist Security Info=False;User ID=svepsdb;Password=Jn&RuWLg&Q8k!7Hz;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
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
