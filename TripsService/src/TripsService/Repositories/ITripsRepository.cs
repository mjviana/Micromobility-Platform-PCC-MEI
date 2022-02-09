using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TripsService.Models;

namespace TripsService.Repositories
{
    public interface ITripsRepository
    {
        Task<List<Trip>> GetAllAsync();
        Task CreateAsync(Trip trip);
        Task<Trip> GetAsync(Guid id);
        Task<List<Trip>> GetFinishedTrips();
        Task<List<Trip>> GetTripsInProgressAsync();
        Task UpdateAsync(Trip trip);
    }
}