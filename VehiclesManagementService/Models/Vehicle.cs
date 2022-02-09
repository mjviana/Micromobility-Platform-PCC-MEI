using System;
using System.ComponentModel.DataAnnotations;

namespace VehicleManagementService.Models
{
    public class Vehicle
    {
        public Guid Id { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]
        public bool Active { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        [Required]
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? UpdatedAt { get; set; }
        [DataType(DataType.Currency)]
        public float PricePerMinute { get; set; }
    }
}