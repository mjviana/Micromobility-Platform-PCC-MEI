using System;
using System.ComponentModel.DataAnnotations;

namespace TripsService.Dtos
{
    public record TripDto(Guid TripId, Guid UserId, Guid VehicleId, double StartLatitude, double StartLongitude, double EndLatitude, double EndLongitude, DateTimeOffset StartedAt, DateTimeOffset FinishedAt, [Range(0.1, 1000)] decimal Cost, string Feedback);
    public record TripInProgressDto(Guid TripId, Guid UserId, Guid VehicleId, double StartLatitude, double StartLongitude, DateTimeOffset StartedAt);
    public record CreateTripDto([Required] Guid VehicleId, [Required] Guid UserId, [Required] double Latitude, [Required] double Longitude);
    public record FinishTripDto([Required] Guid TripId, [Required] double Latitude, [Required] double Longitude, [Required] DateTimeOffset FinishedAt, [Required][Range(0.1, 1000)] decimal Cost, string Feedback);
}