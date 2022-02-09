using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using TripsService.Models;

namespace TripsService.Repositories
{
    public class TripsRepository : ITripsRepository
    {
        private const string collectionName = "trips";
        private readonly IMongoCollection<Trip> dbCollection;
        private readonly FilterDefinitionBuilder<Trip> filterBuilder = Builders<Trip>.Filter;

        public TripsRepository(IMongoDatabase database)
        {
            dbCollection = database.GetCollection<Trip>(collectionName);
        }

        public async Task<List<Trip>> GetAllAsync()
        {
            return await dbCollection.Find(filterBuilder.Empty).ToListAsync();
        }

        public async Task<Trip> GetAsync(Guid id)
        {
            FilterDefinition<Trip> filter = filterBuilder.Eq(t => t.Id, id);
            return await dbCollection.Find(filter).SingleOrDefaultAsync();
        }

        public async Task<List<Trip>> GetTripsInProgressAsync()
        {
            FilterDefinition<Trip> filter = filterBuilder.Where(t => t.FinishedAt == DateTimeOffset.MinValue);
            return await dbCollection.Find(filter).ToListAsync();
        }

        public async Task<List<Trip>> GetFinishedTrips()
        {
            FilterDefinition<Trip> filter = filterBuilder.Where(t => t.FinishedAt != DateTimeOffset.MinValue);
            return await dbCollection.Find(filter).ToListAsync();
        }

        public async Task CreateAsync(Trip trip)
        {
            await dbCollection.InsertOneAsync(trip);
        }

        public async Task UpdateAsync(Trip trip)
        {
            FilterDefinition<Trip> filter = filterBuilder.Eq(et => et.Id, trip.Id);
            await dbCollection.ReplaceOneAsync(filter, trip);
        }
    }
}