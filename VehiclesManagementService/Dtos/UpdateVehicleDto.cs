using System.ComponentModel.DataAnnotations;

namespace VehicleManagementService.Dtos
{
    public class UpdateVehicleDto
    {
        [Required]
        public string Model { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]
        public bool Active { get; set; }
         [DataType(DataType.Currency), Range(0.01,10)]
        public float PricePerMinute { get; set; }
    }
}