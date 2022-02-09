namespace VehicleManagementService.Configurations
{
    public class MongoDbSettings
    {
        public string Host { get; set; } = null!;
        public string Port { get; set; } = null!;

        public string ConnectionString
        {
            get
            {
                return $"mongodb://{Host}:{Port}/{DatabaseName}";
            }
        }
        public string DatabaseName { get; set; } = null!;
        public string CollectionName { get; set; } = null!;
    }
}