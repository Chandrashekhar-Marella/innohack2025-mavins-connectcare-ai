"use client";

import React from 'react'
import Header from './Header';
import { useState, useEffect, useRef } from "react";

import
{
    Box,
    Flex,
    Grid,
    IconButton,
    Separator,
    Text,
    TextField,
    Theme,
} from "@radix-ui/themes";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Lottie from "lottie-react";
import LoaderAnimation from "../utils/loader.json";

const API_BASE_URL = "http://localhost:8000/v3";

const ChatPage = ( { user, onLogout } ) =>
{

    const sleep = ( ms ) => new Promise( ( resolve ) => setTimeout( resolve, ms ) );

    const mockSuggestions = [
        "What is my coverage?",
        "How to file a claim?",
        "What are Cigna's coverage options?",
        "Find in-network providers?",
        "Can I change my policy?",
    ];

    type ChatMessage = {
        id: string | number;
        role: "user" | "agent" | "loader";
        message: string;
        timestamp: string;
    };

    const [ conversation, setConversation ] = useState<ChatMessage[]>( [] );
    const [ suggestions, setSuggestions ] = useState( [] );
    const [ inputValue, setInputValue ] = useState( "" );
    const chatEndRef = useRef<HTMLDivElement>( null );
    const [ threadId ] = useState( uuidv4() );

    const scrollToBottom = React.useCallback( async () =>
    {
        await sleep( 500 );
        chatEndRef.current?.scrollIntoView( { behavior: "smooth" } );
    }, [ chatEndRef ] );


    useEffect( () =>
    {
        if ( typeof window !== "undefined" )
        {
            scrollToBottom();
        }
    }, [ conversation, scrollToBottom ] );


    const handleSubmit = async ( suggestion: string | undefined ) =>
    {
        try
        {
            if ( suggestion || inputValue.trim() )
            {
                if ( suggestion ) setSuggestions( [] );

                const newMessage = {
                    id: uuidv4(),
                    role: "user",
                    message: suggestion || inputValue,
                    timestamp: new Date().toISOString(),
                };

                console.log( "suggestion", suggestion );
                console.log( "inputvalue", inputValue );

                const loader = {
                    id: uuidv4(),
                    role: "loader",
                    message: "",
                    timestamp: new Date().toISOString(),
                };

                setInputValue( "" );

                const tempConversation = [ ...conversation ];
                tempConversation.push( newMessage );
                tempConversation.push( loader );

                setConversation( tempConversation );

                const { data } = await axios.post( `${ API_BASE_URL }/chat`, {
                    thread_id: threadId,
                    message: suggestion || inputValue,
                } );

                if ( data?.assistant )
                {
                    tempConversation.splice( tempConversation.length - 1, 1 );

                    const responseId = uuidv4();

                    const agentResponse: ChatMessage = {
                        id: responseId,
                        role: "agent",
                        message: data.assistant,
                        timestamp: new Date().toISOString(),
                    };

                    tempConversation.push( agentResponse );
                    setConversation( tempConversation );
                    setSuggestions( data?.suggested_questions || [] );
              
                }
            }
        } catch ( e )
        {
            console.warn( e );
        }
    };

    return (
        <div className="bg-gray-50 ">
            <Header
                user={ user }
                onLogout={ onLogout }
            />

            <main className="backdrop-blur-xl bg-white/90 rounded-3xl border border-white/50 shadow-2xl ">
                <Theme>
                    <Box as="div">

                        {/* Background Elements */ }
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-40 " style={ { backgroundColor: '#54bb49' } }></div>

                            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20  delay-1000" style={ { backgroundColor: '#0c84c4' } }></div>

                        </div>

                        <Flex direction="column" gap="3" height="90vh" p="4">
                            <Box flexGrow="1" overflow="scroll">
                                <Flex direction="column" width="50vw" mx="auto">
                                    { conversation.length === 0 && (
                                        <Flex height="75vh" align="center" justify="center">
                                            <Grid align="center" columns="2" justify="center">
                                                { mockSuggestions.map( ( ms, i ) => (
                                                    <Text
                                                        m="2"
                                                        key={ i }
                                                        wrap="nowrap"
                                                        align="center"
                                                        style={ {
                                                            color: "var(--gray-11)",
                                                            backgroundColor: "#3cf9c0",
                                                            padding: 10,
                                                            borderRadius: 10,
                                                            borderColor: "var(--gray-10)",
                                                            borderWidth: 1,
                                                            boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
                                                        } }
                                                        onClick={ () => handleSubmit( ms ) }
                                                    >
                                                        { ms }
                                                    </Text>
                                                ) ) }
                                            </Grid>
                                        </Flex>
                                    ) }

                                    { conversation.map( ( c, i ) => (
                                        <Flex
                                            key={ c.id }
                                            align="center"
                                            justify={ c.role === "user" ? "end" : "start" }
                                            my="2"
                                        >
                                            { c.role === "loader" ? (
                                                <Lottie
                                                    animationData={ LoaderAnimation }
                                                    loop={ true }
                                                    style={ {
                                                        width: 50,
                                                        height: 50,
                                                    } }
                                                />
                                            ) : (
                                                <Box
                                                    style={ {
                                                        padding: 10,
                                                        borderRadius: 10,
                                                        backgroundColor:
                                                            c.role === "user"
                                                                ? "var(--indigo-9)"
                                                                : "var(--gray-3)",
                                                        maxWidth: "80%",
                                                        color: c.role === "user" ? "white" : "var(--gray-12)",
                                                    } }
                                                >
                                                    <Markdown remarkPlugins={ [ remarkGfm ] }>
                                                        { c.message }
                                                    </Markdown>
                                                </Box>
                                            ) }
                                        </Flex>
                                    ) ) }

                                    <Box overflowX="scroll" mt="2" >
                                        <Flex align="center" gap="3" width="1000px">
                                            { suggestions.map( ( ms, i ) => (
                                                <Text
                                                    key={ i }
                                                    wrap="nowrap"
                                                    style={ {
                                                        color: "var(--gray-11)",
                                                        backgroundColor: "#3cf9c0",
                                                        padding: 10,
                                                        borderRadius: 10,
                                                        borderColor: "var(--gray-10)",
                                                        borderWidth: 1,
                                                    } }
                                                    onClick={ () => handleSubmit( ms ) }
                                                >
                                                    { ms }
                                                </Text>
                                            ) ) }
                                        </Flex>
                                    </Box>

                                    <div ref={ chatEndRef }></div>
                                </Flex>
                            </Box>

                            <Separator my="2" size="4" />

                            <Flex gap="3" align="center" justify="center">
                                <Box width="50vw">
                                    <TextField.Root
                                        placeholder="Ask mavin ..."
                                        size="3"
                                        radius="full"
                                        value={ inputValue }
                                        onChange={ ( e ) => setInputValue( e.target.value ) }
                                        onKeyDown={ ( e ) =>
                                        {
                                            if ( e.key === "Enter" ) handleSubmit( undefined );
                                        } }
                                    >
                                        <TextField.Slot></TextField.Slot>
                                        <TextField.Slot>

                                        </TextField.Slot>
                                        <TextField.Slot>
                                            <IconButton
                                                size="3"
                                                variant="ghost"
                                                onClick={ () => handleSubmit( undefined ) }
                                            >
                                                <ArrowUpIcon height="20" width="20" />
                                            </IconButton>
                                        </TextField.Slot>
                                    </TextField.Root>
                                </Box>
                            </Flex>
                        </Flex>
                    </Box>
                </Theme>
            </main>
        </div>
    )
}


export default ChatPage