using System.Collections.Generic;
using System.Linq;
using TripsService.Dtos;
using TripsService.Models;

namespace TripsService.Extensions

{
    public static class TripsExtensions
    {
        public static TripDto AsDto(this Trip trip)
        {
            return trip == null ? null : new TripDto(trip.Id, trip.UserId, trip.VehicleId, trip.StartLatitude, trip.StartLongitude, trip.EndLatitude,
            trip.EndLongitude, trip.StartedAt, trip.FinishedAt, trip.Cost, trip.Feedback);
        }

        public static List<TripDto> AsDto(this List<Trip> trips)
        {
            return trips?.Select(AsDto).ToList();
        }

        public static TripInProgressDto AsTripInProgressDto(this Trip trip)
        {
            return trip == null ? null : new TripInProgressDto(trip.Id, trip.UserId,
            trip.VehicleId, trip.StartLatitude, trip.StartLatitude, trip.StartedAt);
        }

        public static List<TripInProgressDto> AsTripInProgressDto(this List<Trip> trips)
        {
            return trips?.Select(AsTripInProgressDto).ToList();
        }

    }
}