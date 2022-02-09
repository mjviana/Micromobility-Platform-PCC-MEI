using System;

namespace VehicleManagementService.Dtos
{
    public class VehicleDto
    {
        public Guid Id { get; set; }
        public string Model { get; set; }
        public string Status { get; set; }
        public bool Active { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public float PricePerMinute { get; set; }
    }
}