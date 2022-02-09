using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VehicleManagementService.Models;

namespace VehicleManagementService.Repositories
{
    public interface IVehiclesRepository
    {
        Task<Vehicle> GetVehicleAsync(Guid id);
        Task<List<Vehicle>> GetVehiclesAsync();
        Task CreateVehicleAsync(Vehicle vehicle);
        Task UpdateVehicleAsync(Vehicle vehicle);
        Task DeleteVehicleAsync(Guid id);
    }
}