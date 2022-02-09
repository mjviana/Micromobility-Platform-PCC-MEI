using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VehicleManagementService.Dtos;
using VehicleManagementService.Extensions;
using VehicleManagementService.Models;
using VehicleManagementService.Repositories;

namespace VehicleManagementService.Controllers
{
    [ApiController]
    [Route("vehicles")]
    public class VehiclesController : ControllerBase
    {
        private readonly IVehiclesRepository _repository;

        public VehiclesController(IVehiclesRepository repository)
        {
            _repository = repository;
        }

        // GET /vehicles
        /// <summary>
        /// Gets all vehicles
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<List<VehicleDto>>> GetVehiclesAsync()
        {
            var vehicles = (await _repository.GetVehiclesAsync()).AsDto();
            return vehicles is null ? NotFound() : Ok(vehicles);
        }

        // GET /vehicles/{id}
        /// <summary>
        /// Gets a vehicles by Id
        /// </summary>
        /// <param name="id">Vehicle Id</param>
        /// <returns>VehicleDto</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleDto>> GetVehicleAsync(Guid id)
        {
            var vehicle = (await _repository.GetVehicleAsync(id)).AsDto();

            return vehicle is null ? NotFound() : Ok(vehicle);
        }

        // POST /vehicles
        /// <summary>
        /// Creates a new vehicle
        /// </summary>
        /// <param name="vehicleDto">Vehicle to create</param>
        /// <returns>Created vehicle</returns>
        [HttpPost]
        public async Task<ActionResult<VehicleDto>> CreateVehicleAsync(CreateVehicleDto vehicleDto)
        {
            Vehicle vehicle = new()
            {
                Id = Guid.NewGuid(),
                Active = vehicleDto.Active,
                Model = vehicleDto.Model,
                Status = vehicleDto.Status,
                PricePerMinute = vehicleDto.PricePerMinute,
                CreatedAt = DateTimeOffset.UtcNow,
            };

            await _repository.CreateVehicleAsync(vehicle);

            return CreatedAtAction(nameof(GetVehicleAsync), new { id = vehicle.Id }, vehicle.AsDto());
        }

        // PUT /vehicles/{id}
        /// <summary>
        /// Updates a vehicle
        /// </summary>
        /// <param name="id">Vehicle id</param>
        /// <param name="vehicleDto">Fields to update</param>
        /// <returns>204 | 404</returns>
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateVehicleAsync(Guid id, UpdateVehicleDto vehicleDto)
        {
            var existingVehicle = await _repository.GetVehicleAsync(id);

            if (existingVehicle == null)
                return NotFound();

            existingVehicle.Active = vehicleDto.Active;
            existingVehicle.Model = vehicleDto.Model;
            existingVehicle.Status = vehicleDto.Status;
            existingVehicle.PricePerMinute = vehicleDto.PricePerMinute;
            existingVehicle.UpdatedAt = DateTimeOffset.UtcNow;

            await _repository.UpdateVehicleAsync(existingVehicle);

            return NoContent();
        }

        // PUT/vehicles/location/{id}
        /// <summary>
        /// Updates a vehicle location
        /// </summary>
        /// <param name="id">Vehicle Id</param>
        /// <param name="vehicleLocationDto">Fields to update</param>
        /// <returns>404 | 204</returns>
        [HttpPut("location/{id}")]
        public async Task<ActionResult> UpdateVehicleLocation(Guid id, UpdateVehicleLocationDto vehicleLocationDto)
        {
            var existingVehicle = await _repository.GetVehicleAsync(id);

            if (existingVehicle is null)
                return NotFound();

            existingVehicle.Latitude = vehicleLocationDto.Latitude;
            existingVehicle.Longitude = vehicleLocationDto.Longitude;
            existingVehicle.UpdatedAt = DateTimeOffset.UtcNow;

            await _repository.UpdateVehicleAsync(existingVehicle);

            return NoContent();
        }

        // DELETE /vehicles/{id}
        /// <summary>
        /// Deletes a vehicle
        /// </summary>
        /// <param name="id">Vehicle Id</param>
        /// <returns>404 | 204</returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteVehicleAsync(Guid id)
        {
            var existingVehicle = await _repository.GetVehicleAsync(id);

            if (existingVehicle == null)
                return NotFound();

            await _repository.DeleteVehicleAsync(id);

            return NoContent();
        }
    }
}