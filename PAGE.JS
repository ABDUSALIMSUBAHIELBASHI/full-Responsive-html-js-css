const chatForm = document.getElementById('chat-form');
        const userInput = document.getElementById('user-input');
        const chatMessages = document.getElementById('chat-messages');
        const typingIndicator = document.getElementById('typing-indicator');
        const sendButton = document.getElementById('send-button');
        
        // --- Core Functions ---

        /**
         * Adds a message to the chat interface.
         * @param {string} text - The message content.
         * @param {string} sender - 'user' or 'llm'.
         */
        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            
            if (sender === 'user') {
                messageDiv.className = 'flex justify-end';
                messageDiv.innerHTML = `
                    <div class="max-w-4xl p-4 rounded-xl bg-user-green text-white shadow-md">
                        <p class="font-bold mb-1">You</p>
                        <p>${text}</p>
                    </div>
                `;
            } else { // LLM
                messageDiv.className = 'flex justify-start';
                messageDiv.innerHTML = `
                    <div class="max-w-4xl p-4 rounded-xl bg-secondary-dark shadow-md">
                        <p class="font-bold text-gemini-blue mb-1">AI Assistant</p>
                        <p>${text}</p>
                    </div>
                `;
            }

            chatMessages.appendChild(messageDiv);
            
            // Scroll to the bottom of the chat area
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        /**
         * Simulates the LLM API call and response.
         * This function will be replaced by a real Gemini API call.
         * @param {string} query - The user's query.
         */
        async function mockLLMResponse(query) {
            // Disable input while AI is "thinking"
            userInput.disabled = true;
            sendButton.disabled = true;
            typingIndicator.classList.remove('hidden');

            const responseText = await new Promise(resolve => {
                setTimeout(() => {
                    // Simple mock response based on the query
                    if (query.toLowerCase().includes('hello') || query.toLowerCase().includes('hi')) {
                        resolve("Hello there! How can I assist you with your project today?");
                    } else if (query.toLowerCase().includes('responsive')) {
                        resolve("For responsive layouts, I recommend starting with a mobile-first approach. Use CSS Grid for major sections and Flexbox for smaller components for maximum flexibility.");
                    } else if (query.toLowerCase().includes('code')) {
                        resolve("I can generate code! Just tell me the language and what you'd like the code to do.");
                    } else {
                        resolve("That's a great question! I'm simulating a detailed response to your query: '" + query + "'.");
                    }
                }, 1500); // Wait for 1.5 seconds to simulate API latency
            });
            
            addMessage(responseText, 'llm');
            
            // Re-enable input
            userInput.disabled = false;
            sendButton.disabled = false;
            typingIndicator.classList.add('hidden');
            userInput.focus();
        }

        // --- Event Listener ---

        chatForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission
            
            const userQuery = userInput.value.trim();
            
            if (userQuery) {
                // 1. Add user message to the chat
                addMessage(userQuery, 'user');
                
                // 2. Clear the input field
                userInput.value = '';
                
                // 3. Get LLM response (mocked for now, replace with real API call later)
                mockLLMResponse(userQuery);
            }
        });
        
        // Initial focus on input
        window.onload = () => {
            userInput.focus();
        };