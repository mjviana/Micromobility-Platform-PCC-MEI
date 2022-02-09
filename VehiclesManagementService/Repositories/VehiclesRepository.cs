
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VehicleManagementService.Models;

namespace VehicleManagementService.Repositories
{
    public class VehiclesRepository : IVehiclesRepository
    {
        private readonly List<Vehicle> Vehicles = new()
        {
            new Vehicle { Id = Guid.NewGuid(), Model = "xtpo", Status = "Stoped", Active = true, Longitude = 432432445324, Latitude = 432532532, CreatedAt = DateTimeOffset.Now },
            new Vehicle { Id = Guid.NewGuid(), Model = "xtpy", Status = "In trip", Active = true, Longitude = 432432445324, Latitude = 432532532, CreatedAt = DateTimeOffset.Now },
            new Vehicle { Id = Guid.NewGuid(), Model = "xtpz", Status = "Being relocated", Active = false, Longitude = 43524363426247, Latitude = 68356737, CreatedAt = DateTimeOffset.Now },
            new Vehicle { Id = Guid.NewGuid(), Model = "xtpa", Status = "Stoped", Active = true, Longitude = 432432445324, Latitude = 432532532, CreatedAt = DateTimeOffset.Now },
        };

        public async Task<List<Vehicle>> GetVehiclesAsync()
        {
            return await Task.FromResult(Vehicles);
        }

        public async Task<Vehicle> GetVehicleAsync(Guid id)
        {
            var vehicle = Vehicles.Where(v => v.Id == id).SingleOrDefault();
            return await Task.FromResult(vehicle);
        }

        public async Task CreateVehicleAsync(Vehicle vehicle)
        {
            Vehicles.Add(vehicle);
            await Task.CompletedTask;
        }

        public async Task UpdateVehicleAsync(Vehicle vehicle)
        {
            var index = Vehicles.FindIndex(v => v.Id == vehicle.Id);
            Vehicles[index] = vehicle;
            await Task.CompletedTask;
        }

        public async Task DeleteVehicleAsync(Guid id)
        {
            var index = Vehicles.FindIndex(v => v.Id == id);
            Vehicles.RemoveAt(index);
            await Task.CompletedTask;
        }
    }
}