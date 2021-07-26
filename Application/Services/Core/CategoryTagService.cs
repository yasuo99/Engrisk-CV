using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.Pagination;
using Application.Helper;
using Application.Services.Core.Abstraction;
using Domain.Models.Version2;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Services.Core
{
    public class CategoryTagService : ICategoryTagService
    {
        private readonly ApplicationDbContext _context;

        public CategoryTagService()
        {
        }

        public CategoryTagService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<bool> CheckExistAsync(Guid id){
            return await _context.CategoryTags.AnyAsync(tag => tag.Id == id);
        }
        public async Task<bool> CreateCategoryTagAsync(CategoryTag categoryTag)
        {
            _context.Add(categoryTag);
            if(await _context.SaveChangesAsync() > 0){
                return true;
            }
            return false;
        }

        public async Task<bool> DeleteCategoryTagAsync(Guid id)
        {
            var tag = await _context.CategoryTags.FirstOrDefaultAsync(tag => tag.Id == id);
            _context.Remove(tag);
            if(await _context.SaveChangesAsync() > 0){
                return true;
            }
            return false;
        }

        public async Task<PaginateDTO<CategoryTag>> GetAllCategoryTagAsync(PaginationDTO pagination, string search = null)
        {
            var categoryTags = await _context.CategoryTags.OrderByDescending(orderBy => orderBy.CreatedDate).AsNoTracking().ToListAsync();
            if(search != null){
                categoryTags = categoryTags.Where(ct => ct.Tag.ToLower().Contains(search.Trim().ToLower())).ToList();
            }
            var pagingListTags = PagingList<CategoryTag>.OnCreate(categoryTags, pagination.CurrentPage,pagination.PageSize);
            return pagingListTags.CreatePaginate();
        }

        public async Task<List<CategoryTag>> GetAllCategoryTagAsync()
        {
            var tags = await _context.CategoryTags.AsNoTracking().ToListAsync();
            return tags;
        }

        public async Task<bool> UpdateCategoryTagAsync(Guid id, CategoryTag categoryTag)
        {
            var tag = await _context.CategoryTags.FirstOrDefaultAsync(tag => tag.Id == id);
            tag.Tag = categoryTag.Tag;
            if(await _context.SaveChangesAsync() > 0){
                return true;
            }
            return false;
        }
    }
}