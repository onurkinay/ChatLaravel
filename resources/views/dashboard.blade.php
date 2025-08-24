    <x-app-layout>

        <div id="frame">

            @include('layouts.sidebar')
            <div class="content">
                <div class="loader">
                    <div class="loader-inner">
                        <l-grid size="60" speed="1.5" color="#2c3e50"></l-grid>
                    </div>
                </div>
                <div class="contact-profile">
                    <img src="{{ asset('anon.png') }}" alt="" />
                    <p class="contact-name"></p>
                    <div class="social-media">

                    </div>
                </div>
                <div class="messages">
                    <ul>
                        {{-- MESSAGES HERE  --}}

                    </ul>
                </div>
                <div class="message-input">
                    <form action="#" method="POST" class="message-form">
                        @csrf
                        <div class="wrap">
                            <input autocomplete="off" type="text" placeholder="Write your message..." name="message"
                                class="message-box" />
                            <button type="submit" class="submit"><i class="fa fa-paper-plane"
                                    aria-hidden="true"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


        <x-slot name="scripts">
            @vite(['resources/js/app.js', 'resources/js/message.js'])
        </x-slot>
    </x-app-layout>
