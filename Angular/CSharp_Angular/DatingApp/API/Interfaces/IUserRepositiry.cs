using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface IUserRepositiry
{
    void Update(AppUser user);
    Task<bool> SaveAlAsync();
    Task<IEnumerable<AppUser>> GetUsersAsync();
    Task<AppUser> GetUserByIdAsync(int id);
    Task<AppUser> GetUserByUserNameAsync(string userName);

    Task<IEnumerable<MemberDto>> GetMembersAsync();
    Task<MemberDto> GetMemberAsync(string userName);
}
