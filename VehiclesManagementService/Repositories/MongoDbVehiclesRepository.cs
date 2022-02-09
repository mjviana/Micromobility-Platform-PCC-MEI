using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using VehicleManagementService.Configurations;
using VehicleManagementService.Models;

namespace VehicleManagementService.Repositories
{
    public class MongoDbVehiclesRepository : IVehiclesRepository
    {
        private readonly IMongoCollection<Vehicle> vehiclesCollection;
        private readonly FilterDefinitionBuilder<Vehicle> filterBuilder = Builders<Vehicle>.Filter;
        public MongoDbVehiclesRepository(IOptions<MongoDbSettings> vehiclesDatabaseSettings, IMongoClient mongoClient)
        {
            IMongoDatabase database = mongoClient.GetDatabase(vehiclesDatabaseSettings.Value.DatabaseName);

            vehiclesCollection = database.GetCollection<Vehicle>(vehiclesDatabaseSettings.Value.CollectionName);
        }

        public async Task CreateVehicleAsync(Vehicle vehicle)
        {
            await vehiclesCollection.InsertOneAsync(vehicle);
        }

        public async Task DeleteVehicleAsync(Guid id)
        {
            var filter = filterBuilder.Eq(existingvehicle => existingvehicle.Id, id);
            await vehiclesCollection.DeleteOneAsync(filter);
        }

        public async Task<Vehicle> GetVehicleAsync(Guid id)
        {
            var filter = filterBuilder.Eq(v => v.Id, id);
            return await vehiclesCollection.Find(filter).SingleOrDefaultAsync();
        }

        public async Task<List<Vehicle>> GetVehiclesAsync()
        {
            return await vehiclesCollection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task UpdateVehicleAsync(Vehicle vehicle)
        {
            var filter = filterBuilder.Eq(existingVehicle => existingVehicle.Id, vehicle.Id);
            await vehiclesCollection.ReplaceOneAsync(filter, vehicle);
        }
    }
}