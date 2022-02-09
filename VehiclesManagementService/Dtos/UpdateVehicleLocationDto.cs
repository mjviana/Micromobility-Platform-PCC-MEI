using System.ComponentModel.DataAnnotations;

namespace VehicleManagementService.Dtos
{
    public class UpdateVehicleLocationDto
    {
        [Required]
        public decimal Latitude { get; set; }
        [Required]
        public decimal Longitude { get; set; }
    }

}