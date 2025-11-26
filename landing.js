document.addEventListener('DOMContentLoaded', function () {
    // Dashboard elements
    const dashboard = document.getElementById('dashboard');
    const chatbotContainer = document.getElementById('chatbot-container');
    const launchChatbotBtn = document.getElementById('chatbot-launch-btn');
    const closeChatbotBtn = document.getElementById('close-chatbot');
    const seasonButtons = document.querySelectorAll('.season-btn');

    // Chatbot elements
    const messagesContainer = document.getElementById('chatbot-messages');
    const quickRepliesContainer = document.getElementById('quick-replies');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Fashion knowledge base (same as before)
    const fashionKnowledge = {
        seasons: {
            spring: {
                description: "Spring fashion is all about renewal and freshness after winter.",
                colors: ["Pastel pinks", "Mint greens", "Lavenders", "Soft yellows", "Light blues"],
                fabrics: ["Lightweight cotton", "Linen", "Chiffon", "Denim"],
                accessories: ["Floral headbands", "Straw bags", "Cat-eye sunglasses", "Delicate jewelry"],
                trends: ["Oversized blazers", "Midi skirts", "Square necklines", "Chunky loafers"],
                tips: [
                    "Layer lightweight pieces for changing temperatures",
                    "Incorporate pastels or floral patterns",
                    "Try a denim jacket over dresses",
                    "Opt for comfortable block heels or white sneakers"
                ]
            },
            summer: {
                description: "Summer fashion focuses on staying cool while looking stylish.",
                colors: ["Bright whites", "Neon accents", "Ocean blues", "Sunset oranges", "Tropical greens"],
                fabrics: ["Linen", "Cotton", "Seersucker", "Mesh"],
                accessories: ["Wide-brim hats", "Oversized sunglasses", "Woven totes", "Strappy sandals"],
                trends: ["Cut-out details", "Cropped tops", "Tie-dye patterns", "Platform sandals"],
                tips: [
                    "Choose breathable, natural fabrics",
                    "Protect yourself from the sun with hats and sunglasses",
                    "Opt for loose, flowy silhouettes",
                    "Bright colors and bold prints are perfect for summer"
                ]
            },
            fall: {
                description: "Fall fashion is about transition and rich, warm tones.",
                colors: ["Burnt oranges", "Olive greens", "Mustard yellows", "Deep browns", "Burgundies"],
                fabrics: ["Wool", "Corduroy", "Tweed", "Cashmere", "Leather"],
                accessories: ["Blanket scarves", "Ankle boots", "Fedora hats", "Chain bags"],
                trends: ["Oversized sweaters", "Leather jackets", "Plaid patterns", "Knee-high boots"],
                tips: [
                    "Master the art of layering",
                    "Invest in a quality jacket or coat",
                    "Transition summer pieces with fall layers",
                    "Accessorize with scarves and hats"
                ]
            },
            winter: {
                description: "Winter fashion prioritizes warmth without sacrificing style.",
                colors: ["Deep navies", "Rich blacks", "Emerald greens", "Ruby reds", "Creamy ivories"],
                fabrics: ["Wool", "Cashmere", "Down", "Fleece", "Faux fur"],
                accessories: ["Chunky scarves", "Leather gloves", "Beanies", "Knee-high boots"],
                trends: ["Puffer coats", "Turtlenecks", "Plaid skirts", "Lug-sole boots"],
                tips: [
                    "Layer thermal pieces under your outfits",
                    "Invest in a warm, stylish coat",
                    "Choose waterproof footwear",
                    "Accessorize with warm hats and gloves"
                ]
            }
        },
        general: {
            terms: {
                "capsule wardrobe": "A minimal collection of versatile, interchangeable clothing items",
                "haute couture": "High-end fashion that is custom-made for individual clients",
                "streetwear": "Casual clothing inspired by youth culture and skateboarding",
                "sustainable fashion": "Clothing designed, produced, and consumed in an environmentally friendly way",
                "fast fashion": "Inexpensive clothing produced rapidly by mass-market retailers"
            }
        }
    };

    // Dashboard event listeners
    launchChatbotBtn.addEventListener('click', function() {
        dashboard.classList.add('hidden');
        chatbotContainer.classList.remove('hidden');
        chatbotContainer.classList.add('visible');
        
        // Initialize chatbot if not already done
        if (messagesContainer.children.length === 0) {
            initializeChatbot();
        }
    });

    closeChatbotBtn.addEventListener('click', function() {
        chatbotContainer.classList.remove('visible');
        setTimeout(() => {
            dashboard.classList.remove('hidden');
        }, 300);
    });

    seasonButtons.forEach(button => {
        button.addEventListener('click', function() {
            const season = this.getAttribute('data-season');
            dashboard.classList.add('hidden');
            chatbotContainer.classList.remove('hidden');
            chatbotContainer.classList.add('visible');
            
            // Initialize chatbot if not already done
            if (messagesContainer.children.length === 0) {
                initializeChatbot();
            }
            
            // Automatically ask about the selected season
            setTimeout(() => {
                addUserMessage(`${season} fashion tips`);
                respondToUser(`${season} fashion tips`);
            }, 500);
        });
    });

    // Chatbot functions
    function initializeChatbot() {
        // Initial bot message
        setTimeout(() => {
            addBotMessage("Hello! I'm your seasonal fashion assistant. How can I help you today?");
            showQuickReplies([
                "What's trending this season?",
                "Spring fashion tips",
                "Summer outfit ideas",
                "Fall wardrobe essentials",
                "Winter clothing guide"
            ]);
        }, 500);
    }

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addUserMessage(message);
            userInput.value = '';
            respondToUser(message);
        }
    }

    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    function addBotMessage(text, isHTML = false) {
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        messagesContainer.appendChild(typingIndicator);
        scrollToBottom();

        // Remove typing indicator after a delay and show the message
        setTimeout(() => {
            messagesContainer.removeChild(typingIndicator);

            const messageDiv = document.createElement('div');
            messageDiv.className = 'message bot-message';
            
            if (isHTML) {
                messageDiv.innerHTML = text;
            } else {
                messageDiv.textContent = text;
            }
            
            messagesContainer.appendChild(messageDiv);
            scrollToBottom();
        }, 1000 + Math.random() * 1000);
    }

    function showQuickReplies(replies) {
        quickRepliesContainer.innerHTML = '';
        replies.forEach(reply => {
            const button = document.createElement('button');
            button.className = 'quick-reply';
            button.textContent = reply;
            button.addEventListener('click', function() {
                addUserMessage(reply);
                respondToUser(reply);
            });
            quickRepliesContainer.appendChild(button);
        });
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Chatbot interaction handlers
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function respondToUser(message) {
        const lowerMessage = message.toLowerCase();
        const currentSeason = getCurrentSeason();

        // Clear quick replies while bot is "thinking"
        quickRepliesContainer.innerHTML = '';

        setTimeout(() => {
            // Check if message is not fashion-related
            if (!isFashionRelated(lowerMessage)) {
                addBotMessage("I'm a fashion-focused chatbot. Please ask me about seasonal fashion, trends, or styling tips!");
                showQuickReplies([
                    "What's trending this season?",
                    `${currentSeason} fashion tips`,
                    "How to build a capsule wardrobe",
                    "Seasonal color palettes"
                ]);
                return;
            }

            // Check for fashion terms definitions
            for (const [term, definition] of Object.entries(fashionKnowledge.general.terms)) {
                if (lowerMessage.includes(term)) {
                    addBotMessage(`<strong>${term}:</strong> ${definition}`, true);
                    showQuickReplies([
                        "More fashion terms",
                        `What's trending this ${currentSeason}?`,
                        "Back to seasons"
                    ]);
                    return;
                }
            }

            // Main responses
            if (lowerMessage.includes('trend') || lowerMessage.includes('trending')) {
                showSeasonTrends(currentSeason);
            } 
            else if (lowerMessage.includes('spring')) {
                showSeasonDetails('spring');
            } 
            else if (lowerMessage.includes('summer')) {
                showSeasonDetails('summer');
            } 
            else if (lowerMessage.includes('fall') || lowerMessage.includes('autumn')) {
                showSeasonDetails('fall');
            } 
            else if (lowerMessage.includes('winter')) {
                showSeasonDetails('winter');
            } 
            else if (lowerMessage.includes('color') || lowerMessage.includes('palette')) {
                showSeasonColors(currentSeason);
            } 
            else if (lowerMessage.includes('fabric') || lowerMessage.includes('material')) {
                showSeasonFabrics(currentSeason);
            } 
            else if (lowerMessage.includes('accessor')) {
                showSeasonAccessories(currentSeason);
            } 
            else if (lowerMessage.includes('tip') || lowerMessage.includes('advice')) {
                showSeasonTips(currentSeason);
            } 
            else if (lowerMessage.includes('more') || lowerMessage.includes('inform')) {
                addBotMessage(`For more detailed ${currentSeason} fashion advice:<br><br>
                <ul>
                    <li>Check out fashion blogs like Vogue or Harper's Bazaar</li>
                    <li>Follow seasonal fashion hashtags on Instagram</li>
                    <li>Visit local boutiques for seasonal collections</li>
                </ul>
                <br>Would you like some ${currentSeason} styling tips?`, true);
                showQuickReplies([
                    `Yes, show me ${currentSeason} tips`,
                    `What colors work best for ${currentSeason}?`,
                    "Back to seasons"
                ]);
            } 
            else if (lowerMessage.includes('back') || lowerMessage.includes('season') || lowerMessage.includes('home')) {
                addBotMessage("Let's talk about seasonal fashion! Which season would you like advice for?");
                showQuickReplies([
                    "Spring fashion tips",
                    "Summer outfit ideas",
                    "Fall wardrobe essentials",
                    "Winter clothing guide"
                ]);
            } 
            else {
                addBotMessage("I'm here to help with seasonal fashion advice! Try asking about:");
                showQuickReplies([
                    "What's trending this season?",
                    `${currentSeason} fashion tips`,
                    "How to choose seasonal colors",
                    "Essential accessories"
                ]);
            }
        }, 1000);
    }

    function isFashionRelated(message) {
        const fashionKeywords = [
            'fashion', 'style', 'outfit', 'clothing', 'dress', 'wear', 'trend',
            'spring', 'summer', 'fall', 'autumn', 'winter', 'season', 'color',
            'wardrobe', 'accessory', 'jacket', 'shirt', 'pants', 'skirt', 'dress',
            'shoe', 'boot', 'hat', 'scarf', 'glove', 'jewelry', 'fabric', 'material',
            'pattern', 'print', 'trendy', 'vintage', 'casual', 'formal', 'look'
        ];
        
        return fashionKeywords.some(keyword => message.includes(keyword));
    }

    function showSeasonTrends(season) {
        const seasonData = fashionKnowledge.seasons[season];
        let response = `<strong>This ${season}'s top trends:</strong><br><br><ul>`;
        
        seasonData.trends.forEach(trend => {
            response += `<li>${trend}</li>`;
        });
        
        response += `</ul><br><span class="info-link" onclick="showSeasonDetails('${season}')">More ${season} fashion info</span>`;
        
        addBotMessage(response, true);
        showQuickReplies([
            `${season} color palette`,
            `Best ${season} fabrics`,
            `Essential ${season} accessories`,
            "Back to seasons"
        ]);
    }

    function showSeasonDetails(season) {
        const seasonData = fashionKnowledge.seasons[season];
        let response = `<strong>${season.charAt(0).toUpperCase() + season.slice(1)} Fashion Guide</strong><br><br>`;
        response += `${seasonData.description}<br><br>`;
        response += `<strong>Key Colors:</strong><br><ul>`;
        
        seasonData.colors.forEach(color => {
            response += `<li>${color}</li>`;
        });
        
        response += `</ul><br><strong>Recommended Fabrics:</strong><br><ul>`;
        
        seasonData.fabrics.forEach(fabric => {
            response += `<li>${fabric}</li>`;
        });
        
        response += `</ul><br><strong>Top Tips:</strong><br><ol>`;
        
        seasonData.tips.forEach(tip => {
            response += `<li>${tip}</li>`;
        });
        
        response += `</ol><br><span class="info-link" onclick="showSeasonTrends('${season}')">See ${season} trends</span> | `;
        response += `<span class="info-link" onclick="showSeasonColors('${season}')">Color guide</span>`;
        
        addBotMessage(response, true);
        showQuickReplies([
            `${season} trends`,
            `${season} color combinations`,
            `How to accessorize for ${season}`,
            "Back to seasons"
        ]);
    }

    function showSeasonColors(season) {
        const seasonData = fashionKnowledge.seasons[season];
        let response = `<strong>Best ${season} color palettes:</strong><br><br><ul>`;
        
        seasonData.colors.forEach(color => {
            response += `<li>${color}</li>`;
        });
        
        response += `</ul><br>These colors work well together and complement the ${season} atmosphere. `;
        response += `Try mixing 2-3 of these in an outfit for a seasonal look.<br><br>`;
        response += `<span class="info-link" onclick="showSeasonDetails('${season}')">More ${season} fashion info</span>`;
        
        addBotMessage(response, true);
        showQuickReplies([
            `How to mix ${season} colors`,
            `Fabrics for ${season}`,
            `Back to ${season} overview`,
            "Back to seasons"
        ]);
    }

    function showSeasonFabrics(season) {
        const seasonData = fashionKnowledge.seasons[season];
        let response = `<strong>Recommended fabrics for ${season}:</strong><br><br><ul>`;
        
        seasonData.fabrics.forEach(fabric => {
            response += `<li>${fabric}</li>`;
        });
        
        response += `</ul><br>These materials will keep you comfortable and stylish during ${season}. `;
        response += `Consider layering different fabrics for texture and interest.<br><br>`;
        response += `<div class="tip-message"><strong>Tip:</strong> Natural fibers like cotton and wool are breathable and regulate temperature well.</div>`;
        
        addBotMessage(response, true);
        showQuickReplies([
            `${season} color guide`,
            `How to layer ${season} fabrics`,
            `Essential ${season} pieces`,
            "Back to seasons"
        ]);
    }

    function showSeasonAccessories(season) {
        const seasonData = fashionKnowledge.seasons[season];
        let response = `<strong>Must-have ${season} accessories:</strong><br><br><ul>`;
        
        seasonData.accessories.forEach(accessory => {
            response += `<li>${accessory}</li>`;
        });
        
        response += `</ul><br>Accessories can transform your ${season} looks from basic to stylish. `;
        response += `Don't be afraid to make a statement with bold pieces!<br><br>`;
        response += `<span class="info-link" onclick="showSeasonTips('${season}')">See ${season} styling tips</span>`;
        
        addBotMessage(response, true);
        showQuickReplies([
            `${season} shoe options`,
            `How to choose ${season} jewelry`,
            `Back to ${season} overview`,
            "Back to seasons"
        ]);
    }

    function showSeasonTips(season) {
        const seasonData = fashionKnowledge.seasons[season];
        let response = `<strong>Top ${season} fashion tips:</strong><br><br><ol>`;
        
        seasonData.tips.forEach(tip => {
            response += `<li>${tip}</li>`;
        });
        
        response += `</ol><br><div class="tip-message"><strong>Remember:</strong> Fashion is about expressing yourself. `;
        response += `Use these tips as guidelines, but always wear what makes you feel confident!</div>`;
        
        addBotMessage(response, true);
        showQuickReplies([
            `${season} trends`,
            `${season} color combinations`,
            `Essential ${season} pieces`,
            "Back to seasons"
        ]);
    }

    function getCurrentSeason() {
        const month = new Date().getMonth() + 1;
        if (month >= 3 && month <= 5) return 'spring';
        if (month >= 6 && month <= 8) return 'summer';
        if (month >= 9 && month <= 11) return 'fall';
        return 'winter';
    }

    // Make functions available for HTML onclick events
    window.showSeasonTrends = showSeasonTrends;
    window.showSeasonDetails = showSeasonDetails;
    window.showSeasonColors = showSeasonColors;
    window.showSeasonFabrics = showSeasonFabrics;
    window.showSeasonAccessories = showSeasonAccessories;
    window.showSeasonTips = showSeasonTips;
});