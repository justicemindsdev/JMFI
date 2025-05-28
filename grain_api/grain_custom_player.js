/**
 * Grain Custom Player Wrapper
 * 
 * This script provides a custom wrapper around Grain embeds to control
 * video playback more precisely, particularly for time-constrained segments.
 * 
 * Features:
 * - Enforces start and end times for video segments
 * - Handles player initialization and events
 * - Provides a simple API for controlling playback
 * - Works with both direct embeds and highlight embeds
 */

class GrainPlayerController {
    /**
     * Create a new Grain Player Controller
     * @param {Object} options - Configuration options
     * @param {string} options.containerId - ID of the container element
     * @param {string} options.recordingId - Grain recording ID
     * @param {string} options.accessToken - Grain access token
     * @param {number} options.startTime - Start time in seconds
     * @param {number} options.endTime - End time in seconds
     * @param {boolean} options.autoplay - Whether to autoplay the video
     * @param {Function} options.onReady - Callback when player is ready
     * @param {Function} options.onTimeUpdate - Callback on time update
     * @param {Function} options.onEnd - Callback when segment ends
     */
    constructor(options) {
        this.options = Object.assign({
            containerId: 'grain-player-container',
            recordingId: '',
            accessToken: '',
            startTime: 0,
            endTime: 0,
            autoplay: false,
            onReady: () => {},
            onTimeUpdate: () => {},
            onEnd: () => {}
        }, options);

        this.container = document.getElementById(this.options.containerId);
        if (!this.container) {
            throw new Error(`Container element with ID "${this.options.containerId}" not found`);
        }

        this.iframe = null;
        this.isReady = false;
        this.currentTime = 0;
        this.isPlaying = false;
        this.checkInterval = null;

        // Bind methods
        this.handleMessage = this.handleMessage.bind(this);
        this.checkTimeConstraints = this.checkTimeConstraints.bind(this);
        
        // Initialize
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
        
        // Build the embed URL with multiple time parameters for maximum compatibility
        const embedUrl = `https://grain.com/_/embed/recording/${this.options.recordingId}/${this.options.accessToken}?start=${this.options.startTime}&end=${this.options.endTime}&t=${this.options.startTime}&time=${this.options.startTime}&autoplay=${this.options.autoplay ? 'true' : 'false'}&origin=custom_player#t=${this.options.startTime}`;
        
        this.iframe.setAttribute('src', embedUrl);
        
        // Add the iframe to the container
        this.container.appendChild(this.iframe);
        
        // Set up message listener for communication with the iframe
        window.addEventListener('message', this.handleMessage);
        
        // Set up time constraint checking
        this.checkInterval = setInterval(this.checkTimeConstraints, 500);
        
        // Force seek to start time after a delay to ensure it loads at the correct position
        setTimeout(() => {
            this.forceSeekToStart();
        }, 2000);
    }
    
    /**
     * Force seek to start time
     * This is a more aggressive approach to ensure the video starts at the correct time
     */
    forceSeekToStart() {
        if (this.iframe && this.iframe.contentWindow) {
            // Try multiple approaches to set the start time
            
            // 1. Use postMessage API
            this.iframe.contentWindow.postMessage({
                action: 'seek',
                time: this.options.startTime
            }, 'https://grain.com');
            
            // 2. Try to access the video element directly (may be blocked by CORS)
            try {
                const videoElement = this.iframe.contentWindow.document.querySelector('video');
                if (videoElement) {
                    videoElement.currentTime = this.options.startTime;
                }
            } catch (e) {
                // Ignore CORS errors
            }
            
            // 3. If autoplay is enabled, also send play command
            if (this.options.autoplay) {
                this.iframe.contentWindow.postMessage({
                    action: 'play'
                }, 'https://grain.com');
            }
        }
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
            
            // Handle player ready event
            if (data.event === 'ready') {
                this.isReady = true;
                this.seek(this.options.startTime);
                this.options.onReady();
            }
            
            // Handle time update event
            if (data.event === 'timeupdate') {
                this.currentTime = data.currentTime;
                this.options.onTimeUpdate(this.currentTime);
            }
            
            // Handle play event
            if (data.event === 'play') {
                this.isPlaying = true;
            }
            
            // Handle pause event
            if (data.event === 'pause') {
                this.isPlaying = false;
            }
            
            // Handle end event
            if (data.event === 'ended') {
                this.isPlaying = false;
                this.options.onEnd();
            }
        } catch (error) {
            console.error('Error processing message from Grain player:', error);
        }
    }

    /**
     * Check if the current time is within the constraints
     */
    checkTimeConstraints() {
        if (!this.isReady || !this.isPlaying) return;
        
        // If we have an end time and the current time exceeds it, reset to start time
        if (this.options.endTime > 0 && this.currentTime >= this.options.endTime) {
            this.seek(this.options.startTime);
            this.options.onEnd();
        }
    }

    /**
     * Seek to a specific time
     * @param {number} time - Time in seconds
     */
    seek(time) {
        if (!this.isReady) return;
        
        this.iframe.contentWindow.postMessage({
            action: 'seek',
            time: time
        }, 'https://grain.com');
    }

    /**
     * Play the video
     */
    play() {
        if (!this.isReady) return;
        
        this.iframe.contentWindow.postMessage({
            action: 'play'
        }, 'https://grain.com');
    }

    /**
     * Pause the video
     */
    pause() {
        if (!this.isReady) return;
        
        this.iframe.contentWindow.postMessage({
            action: 'pause'
        }, 'https://grain.com');
    }

    /**
     * Toggle play/pause
     */
    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    /**
     * Get the current time
     * @returns {number} Current time in seconds
     */
    getTime() {
        return this.currentTime;
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

// Example usage:
/*
document.addEventListener('DOMContentLoaded', () => {
    const player = new GrainPlayerController({
        containerId: 'grain-player-container',
        recordingId: '7458efd4-a56f-455d-b189-43073da8b118',
        accessToken: 'N0RUBU3W9LO14XgmKxF2o7RqZjhmZoOjXsU3vWJo',
        startTime: 120,
        endTime: 165,
        autoplay: false,
        onReady: () => {
            console.log('Player is ready');
        },
        onTimeUpdate: (time) => {
            console.log('Current time:', time);
        },
        onEnd: () => {
            console.log('Segment ended');
        }
    });
    
    // Add custom controls
    document.getElementById('play-button').addEventListener('click', () => {
        player.play();
    });
    
    document.getElementById('pause-button').addEventListener('click', () => {
        player.pause();
    });
    
    document.getElementById('restart-button').addEventListener('click', () => {
        player.seek(player.options.startTime);
    });
});
*/
