namespace PokemonReviewApp.Dto
{
    public class PokemonDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public ICollection<OwnerDto>? PokemonOwners { get; set; }
        public ICollection<CategoryDto>? PokemonCategories { get; set; }
    }
}