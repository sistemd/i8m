package main

import "github.com/ennmichael/i8m/server/server"

const staticFilesRoot = "../client/dist"

func main() {
	server.Start(staticFilesRoot)
}
