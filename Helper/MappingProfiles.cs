using AutoMapper;
using PokemonReviewApp.Dto;
using PokemonReviewApp.Models;

namespace PokemonReviewApp.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() 
        { 
            CreateMap<Pokemon, PokemonDto>()
            .ForMember(dest => dest.Owners, opt => opt.MapFrom(src => src.PokemonOwners.Select(po => po.Owner)))
            .ForMember(dest => dest.Categories, opt => opt.MapFrom(src => src.PokemonCategories.Select(pc => pc.Category))); 
            CreateMap<PokemonDto, Pokemon>();
            
            CreateMap<Category, CategoryDto>();
            CreateMap<CategoryDto, Category>();
            
            CreateMap<Country, CountryDto>();
            CreateMap<CountryDto, Country>();
            
            CreateMap<Owner, OwnerDto>();
            CreateMap<OwnerDto, Owner>();
            
            CreateMap<Review, ReviewDto>();
            CreateMap<ReviewDto, Review>();
            
            CreateMap<Reviewer, ReviewerDto>();
            CreateMap<ReviewerDto, Reviewer>();
        }
    }
}
