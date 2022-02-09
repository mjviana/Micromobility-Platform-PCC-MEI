using System;
using System.ComponentModel.DataAnnotations;

namespace TripsService.Models
{
    public class Trip
    {
        public Guid Id { get; set; }
        public Guid VehicleId { get; set; }
        public Guid UserId { get; set; }
        public double StartLatitude { get; set; }
        public double StartLongitude { get; set; }
        public double EndLatitude { get; set; }
        public double EndLongitude { get; set; }
        public DateTimeOffset StartedAt { get; set; }
        public DateTimeOffset FinishedAt { get; set; }
        public string Feedback { get; set; }

        [DataType(DataType.Currency), Range(0.1, 9999)]
        public decimal Cost { get; set; }
    }
}