using System.Collections.Generic;
using System.Linq;
using VehicleManagementService.Dtos;
using VehicleManagementService.Models;

namespace VehicleManagementService.Extensions
{
    public static class VehicleExtensions
    {
        public static VehicleDto AsDto(this Vehicle vehicle)
        {
            return vehicle == null ? null : new VehicleDto
            {
                Id = vehicle.Id,
                Active = vehicle.Active,
                Latitude = vehicle.Latitude,
                Longitude = vehicle.Longitude,
                Model = vehicle.Model,
                Status = vehicle.Status,
                PricePerMinute = vehicle.PricePerMinute
            };
        }

        public static List<VehicleDto> AsDto(this List<Vehicle> vehicles)
        {
            return vehicles?.Select(AsDto).ToList();

        }
    }
}