# Assessment Answers

## Question 1: Expected Users Calculation

### Given

* Total Population = 1,000,000
* Smartphone Owners = 60%
* App Installation Rate = 20%

### Calculation

```text
1,000,000 × 60% = 600,000 smartphone users

600,000 × 20% = 120,000 app users
```

### Answer

Expected number of users = **120,000**

---

## Question 2: API Works Locally but Fails in Production

### Debugging Flow

```text
Application Fails
        ↓
Check Browser Console & Network Requests
        ↓
Check API URL and API Key
        ↓
Check Environment Variables
        ↓
Test API Separately Using Postman
        ↓
Identify and Fix the Issue
```

### Explanation

I would first check the browser console and network requests for errors. Then I would verify that the API URL and API key are correct. After that, I would check environment variables and test the API separately using Postman to determine whether the issue is from the frontend or backend.

---

## Question 3: Users Spend 10 Minutes on a Page but Conversions are Low

### Possible Reasons

* Too many clicks are required to complete the desired action.
* Poor user interface (unclear icons, confusing layout, improper colors).
* Distractions such as ads, popups, or unnecessary content.

### Conclusion

Users may be spending time trying to understand the page instead of completing the intended action.

---

## Question 4: MVP Prioritization (24 Hours)

### Features to Prioritize

✅ Search weather by city

✅ Display current weather information

✅ Error handling

✅ User-friendly interface

### Features to Postpone

❌ Advanced analytics

❌ User accounts and profiles

❌ Social sharing

❌ Additional customization features

### Reasoning

An MVP should focus on the core functionality that delivers value to users as quickly as possible.

---

## Question 5: Debugging Challenge

### Given Code

```jsx
const [weather, setWeather] = useState();

useEffect(() => {
  fetchWeather();
}, []);

return <div>{weather.temp}</div>;
```

### A) What Issue Can Occur?

The `weather` state variable is initially undefined. The application tries to access `weather.temp` before the API data is loaded, which can cause an error.

### B) How Would You Fix It?

```jsx
return <div>{weather?.temp}</div>;
```

### Explanation

The optional chaining operator (`?.`) checks whether the weather object exists before accessing `temp`.

```text
If weather exists
       ↓
Show temperature

If weather does not exist
       ↓
Show nothing (no crash)
```

This prevents the application from crashing while waiting for the API response.
