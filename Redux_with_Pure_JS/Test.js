let prevState = {accounts: {amount: 200}, bonus: {points: 2}};

// const newState = {accounts: {amount: prevState.accounts.amount}, bonus: {points: prevState.bonus.points + 1}};

const newState = {...prevState, bonus: {points: prevState.bonus.points + 1}}; // shallow copy ...

newState.accounts.amount = 100;
console.log(newState, prevState);