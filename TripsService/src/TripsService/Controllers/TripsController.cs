using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TripsService.Dtos;
using TripsService.Extensions;
using TripsService.Models;
using TripsService.Repositories;

namespace TripsService.Controllers
{
    [ApiController]
    [Route("Trips")]
    public class TripsController : ControllerBase
    {
        private readonly ITripsRepository tripsRepository;

        public TripsController(ITripsRepository tripsRepository)
        {
            this.tripsRepository = tripsRepository;
        }

        // GET /trips
        /// <summary>
        /// Gets all trips 
        /// </summary>
        /// <returns>List of TripDto</returns>
        [HttpGet]
        public async Task<ActionResult<List<TripDto>>> GetTripsAsync()
        {
            var trips = (await tripsRepository.GetAllAsync()).AsDto();
            return trips == null ? NotFound() : Ok(trips);
        }


        // GET /trips/{id}
        /// <summary>
        /// Gets a trip by Id
        /// </summary>
        /// <param name="id">Trip Id</param>
        /// <returns>TripDto</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<TripDto>> GetTripAsync(Guid id)
        {
            var trip = (await tripsRepository.GetAsync(id)).AsDto();
            return trip == null ? NotFound() : Ok(trip);
        }


        // GET /trips/in_progress
        /// <summary>
        /// Gets the trips that are in progress
        /// </summary>
        /// <returns> List of TripsInProgressDto</returns>
        [HttpGet("in_progress")]
        public async Task<ActionResult<List<TripInProgressDto>>> GetTripsInProgressAsync()
        {
            var trips = (await tripsRepository.GetTripsInProgressAsync()).AsTripInProgressDto();
            return trips == null ? NotFound() : Ok(trips);
        }

        // GET /trips/finished
        /// <summary>
        /// Gets finished trips
        /// </summary>
        /// <returns>List of TripDto</returns>
        [HttpGet("finished")]
        public async Task<ActionResult<List<TripDto>>> GetFinishedTripsAsync()
        {
            var trips = (await tripsRepository.GetFinishedTrips()).AsDto();
            return trips == null ? NotFound() : Ok(trips);
        }

        // POST /trips
        /// <summary>
        /// Creates a new trip
        /// </summary>
        /// <param name="createTripDto">Model needed for creating a new trip</param>
        /// <returns>TripDto</returns>
        [HttpPost]
        public async Task<ActionResult<TripDto>> StartTripAync(CreateTripDto createTripDto)
        {
            var trip = new Trip
            {
                Id = Guid.NewGuid(),
                UserId = createTripDto.UserId,
                VehicleId = createTripDto.VehicleId,
                StartedAt = DateTimeOffset.UtcNow,
                StartLatitude = createTripDto.Latitude,
                StartLongitude = createTripDto.Longitude,
            };

            await tripsRepository.CreateAsync(trip);

            return CreatedAtAction(nameof(GetTripAsync), new { id = trip.Id }, trip);
        }

        // PUT /trips/{id}
        /// <summary>
        /// Finish a trip
        /// </summary>
        /// <param name="id">Trip Id</param>
        /// <param name="finishTripDto"></param>
        /// <returns>200 | 400</returns>
        [HttpPut("{id}")]
        public async Task<ActionResult> FinishTripAsync(Guid id, FinishTripDto finishTripDto)
        {
            var existingTrip = await tripsRepository.GetAsync(id);

            if (existingTrip is null)
                return NotFound();

            existingTrip.EndLatitude = finishTripDto.Latitude;
            existingTrip.EndLongitude = finishTripDto.Longitude;
            existingTrip.FinishedAt = finishTripDto.FinishedAt;
            existingTrip.Cost = finishTripDto.Cost;
            existingTrip.Feedback = finishTripDto.Feedback;

            await tripsRepository.UpdateAsync(existingTrip);

            return NoContent();
        }
    }
}