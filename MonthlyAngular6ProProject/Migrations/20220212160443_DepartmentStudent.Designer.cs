﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MonthlyAngular6ProProject.Context;

namespace MonthlyAngular6ProProject.Migrations
{
    [DbContext(typeof(MyDbContext))]
    [Migration("20220212160443_DepartmentStudent")]
    partial class DepartmentStudent
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.13")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MonthlyAngular6ProProject.Context.Department", b =>
                {
                    b.Property<string>("departmentid")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("location")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("subjectname")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("departmentid");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("MonthlyAngular6ProProject.Context.Student", b =>
                {
                    b.Property<string>("studentid")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("date")
                        .HasColumnType("datetime2");

                    b.Property<string>("departmentid")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("gender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal?>("payment")
                        .HasColumnType("decimal(18,4)");

                    b.Property<string>("picture")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("present")
                        .HasColumnType("bit");

                    b.Property<string>("studentclass")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("studentname")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("studentid");

                    b.HasIndex("departmentid");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("MonthlyAngular6ProProject.Context.Student", b =>
                {
                    b.HasOne("MonthlyAngular6ProProject.Context.Department", "department")
                        .WithMany("students")
                        .HasForeignKey("departmentid");

                    b.Navigation("department");
                });

            modelBuilder.Entity("MonthlyAngular6ProProject.Context.Department", b =>
                {
                    b.Navigation("students");
                });
#pragma warning restore 612, 618
        }
    }
}
