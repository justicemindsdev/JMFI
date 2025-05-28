/**
 * Grain Time Range Player
 * 
 * A lightweight solution for controlling both start and end times in Grain video embeds.
 * This script provides a simple way to embed Grain videos with precise time constraints.
 */

class GrainTimeRangePlayer {
    /**
     * Create a new Grain Time Range Player
     * @param {Object} options - Configuration options
     * @param {string} options.containerId - ID of the container element
     * @param {string} options.videoId - Grain video ID
     * @param {number} options.startTime - Start time in seconds
     * @param {number} options.endTime - End time in seconds (optional)
     * @param {boolean} options.autoplay - Whether to autoplay the video (default: true)
     * @param {number} options.height - Height of the player (default: "500")
     * @param {string} options.width - Width of the player (default: "100%")
     */
    constructor(options) {
        this.options = Object.assign({
            containerId: 'grain-player-container',
            videoId: '',
            startTime: 0,
            endTime: null,
            autoplay: true,
            height: "500",
            width: "100%"
        }, options);

        this.container = document.getElementById(this.options.containerId);
        if (!this.container) {
            throw new Error(`Container element with ID "${this.options.containerId}" not found`);
        }

        this.iframe = null;
        this.checkInterval = null;
        this.currentTime = 0;
        
        // Initialize the player
        this.init();
    }

    /**
     * Initialize the player
     */
    init() {
        // Create iframe element
        this.iframe = document.createElement('iframe');
        
        // Set iframe attributes
        this.iframe.setAttribute('allow', 'fullscreen');
        this.iframe.setAttribute('allowfullscreen', 'true');
        this.iframe.setAttribute('frameborder', '0');
        this.iframe.setAttribute('height', this.options.height);
        this.iframe.setAttribute('width', this.options.width);
        
        // Format the time string for the URL
        const timeString = this.formatTimeForUrl(this.options.startTime);
        
        // Build the embed URL with the t parameter for start time
        const embedUrl = `https://grain.com/_/embed/recording/${this.options.videoId}/oMarnTp5zhCtrRsJJ1Sw1t1t4Q9A2qcMjpSMvoz6?autoplay=${this.options.autoplay ? 'true' : 'false'}&t=${timeString}`;
        
        this.iframe.setAttribute('src', embedUrl);
        
        // Add the iframe to the container
        this.container.appendChild(this.iframe);
        
        // Set up message listener for communication with the iframe
        window.addEventListener('message', this.handleMessage.bind(this));
        
        // If an end time is specified, set up interval to check time
        if (this.options.endTime !== null) {
            this.checkInterval = setInterval(() => {
                this.checkTimeConstraints();
            }, 500);
        }
    }
    
    /**
     * Format time in seconds to the format expected by Grain
     * @param {number} seconds - Time in seconds
     * @returns {string} - Formatted time string
     */
    formatTimeForUrl(seconds) {
        // For the t parameter, we can just use the seconds value
        return seconds.toString();
    }
    
    /**
     * Handle messages from the iframe
     * @param {MessageEvent} event - Message event
     */
    handleMessage(event) {
        // Only process messages from Grain
        if (event.origin !== 'https://grain.com') return;
        
        try {
            const data = event.data;
            
            // Handle time update event
            if (data.type === 'timeupdate') {
                this.currentTime = data.currentTime;
            }
        } catch (error) {
            console.error('Error processing message from Grain player:', error);
        }
    }
    
    /**
     * Check if the current time is within the constraints
     */
    checkTimeConstraints() {
        // If we have an end time and the current time exceeds it, reset to start time
        if (this.options.endTime !== null && this.currentTime >= this.options.endTime) {
            // Either pause the video or reset to start time
            this.resetToStart();
        }
    }
    
    /**
     * Reset the player to the start time
     */
    resetToStart() {
        // Try to use postMessage to control the player
        if (this.iframe && this.iframe.contentWindow) {
            // First pause the video
            this.iframe.contentWindow.postMessage({
                action: 'pause'
            }, 'https://grain.com');
            
            // Then seek to the start time
            this.iframe.contentWindow.postMessage({
                action: 'seek',
                time: this.options.startTime
            }, 'https://grain.com');
        }
    }
    
    /**
     * Destroy the player
     */
    destroy() {
        // Clear interval
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
        }
        
        // Remove message listener
        window.removeEventListener('message', this.handleMessage);
        
        // Remove iframe
        if (this.iframe && this.iframe.parentNode) {
            this.iframe.parentNode.removeChild(this.iframe);
        }
    }
}
