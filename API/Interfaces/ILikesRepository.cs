using System;
using API.Entities;
using API.Helpers;

namespace API.Interfaces;

public interface ILikesRepository
{
    Task<MemberLike?> GetMemberLike(string sourceMemberId, string targetMemberId );

    // Task<IReadOnlyList<Member>> GetMemberLikes(string predicate, string memberId);

    Task<PaginatedResult<Member>> GetMemberLikes(LikesParams likesParams);
    
    Task<IReadOnlyList<string>> GetCurrentMemberLikeIds(string memberId);

    void DeleteLike(MemberLike like);

    void AddLike(MemberLike like);

    
    }
