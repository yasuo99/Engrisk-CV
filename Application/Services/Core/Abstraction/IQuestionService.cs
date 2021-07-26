using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.DTOs.Pagination;
using Application.DTOs.Question;
using Domain.Enums;
using Domain.Models;

namespace Application.Services.Core.Abstraction
{
    public interface IQuestionService
    {
        Task<PaginateDTO<QuestionDTO>> GetQuestionsAsync(PaginationDTO pagination, QuestionType type, QuestionStatus status, GrammarQuestionType grammar, string search = null);
        void ChangeStatusAsync(Question question);
        Task ChangeStatusAsync(Guid id);
        Task ChangeStatusAsync(List<Guid> ids);
        void ChangeStatusAsync(List<Question> questions);
        Task<StatisticalDTO> GetStatisticalAsync();
        Task<List<QuestionDTO>> GetQuestionsAsync(QuestionType type, GrammarQuestionType grammar,string search = null);
        Task<bool> CreateQuestionAsync(QuestionCreateDTO questionCreateDTO);
        Task<bool> CheckExistAsync(Guid id);
        Task<bool> CheckExistAsync(Question question);
        Task<bool> CheckAnswerAsync(Guid questionId, Guid answerId);
        Task<bool> CheckAnswerAsync(Guid questionId, string answer);
        Task<bool> DeleteQuestionAsync(Guid id);
        Task VocabularyPracticeAsync(Guid questionId, int accountId);
    }
}