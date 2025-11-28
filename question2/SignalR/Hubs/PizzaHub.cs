using Microsoft.AspNetCore.SignalR;
using SignalR.Models.Dtos;
using SignalR.Services;

namespace SignalR.Hubs
{
    public class PizzaHub : Hub
    {
        private readonly PizzaManager _pizzaManager;

        public PizzaHub(PizzaManager pizzaManager) {
            _pizzaManager = pizzaManager;
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
            _pizzaManager.AddUser();
            await Clients.All.SendAsync("NbUserDataResponse", _pizzaManager.NbConnectedUsers);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await base.OnConnectedAsync();
            _pizzaManager.RemoveUser();
            await Clients.All.SendAsync("NbUserDataResponse", _pizzaManager.NbConnectedUsers);
        }

        public async Task SelectChoice(PizzaChoice choice)
        {
            string groupName = _pizzaManager.GetGroupName(choice);
            if(string.IsNullOrEmpty(groupName)) return;
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("UpdateMoneyResponse", _pizzaManager.Money[(int)choice]);
            await Clients.Group(groupName).SendAsync("UpdateNbPizzasAndMoney", new PizzaDto { NbPizzas = _pizzaManager.NbPizzas[(int)choice], PizzaPrice = _pizzaManager.PIZZA_PRICES[(int)choice] });
        }

        public async Task UnselectChoice(PizzaChoice choice)
        {
            string groupName = _pizzaManager.GetGroupName(choice);
            if (string.IsNullOrEmpty(groupName)) return;
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task AddMoney(PizzaChoice choice)
        {
            _pizzaManager.IncreaseMoney(choice);
            string groupName = _pizzaManager.GetGroupName(choice);
            if (string.IsNullOrEmpty(groupName)) return;
            await Clients.Group(groupName).SendAsync("UpdateMoneyResponse", _pizzaManager.Money[(int)choice]);
        }

        public async Task BuyPizza(PizzaChoice choice)
        {
            _pizzaManager.BuyPizza(choice);
            string groupName = _pizzaManager.GetGroupName(choice);
            if (string.IsNullOrEmpty(groupName)) return;
            await Clients.Group(groupName).SendAsync("UpdateMoneyResponse", _pizzaManager.Money[(int)choice]);
            await Clients.Group(groupName).SendAsync("UpdateNbPizzasAndMoney", new PizzaDto { NbPizzas = _pizzaManager.NbPizzas[(int)choice], PizzaPrice = _pizzaManager.PIZZA_PRICES[(int)choice] });
        }
    }
}
