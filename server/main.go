package main

import "github.com/ennmichael/i8m/server/server"

const staticFilesRoot = "../client/dist"

// Client represents a client talking to the server.

func main() {
	server.Start(staticFilesRoot)
}
