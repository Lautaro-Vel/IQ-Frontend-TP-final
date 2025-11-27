

window.addEventListener('beforeunload', () => {
  localStorage.removeItem('token');
});

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <UserContextProvider>
        <FeedContextProvider>
          <GroupContextProvider>
            <MessageContextProvider>
              <App/>
            </MessageContextProvider>
          </GroupContextProvider>
        </FeedContextProvider>
      </UserContextProvider>
    </AuthProvider>
  </BrowserRouter>
)