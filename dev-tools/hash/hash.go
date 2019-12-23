package main

import (
	"crypto/md5"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"os"
	"path"
	"path/filepath"
	"strings"
)

func main() {
	fileNameClean := parseArgs(os.Args)
	fileNameOld := findMatchingFileWithHashInName(fileNameClean)
	fileNameNew := calculateFileNameWithUpdatedHash(fileNameClean, fileNameOld)
	if fileNameNew == fileNameOld {
		return
	}
	fmt.Printf("%s --> %s\n", fileNameOld, fileNameNew)
	os.Rename(fileNameOld, fileNameNew)
	replaceOccurrences(".", fileNameOld, fileNameNew)
	replaceOccurrences("test", fileNameOld, fileNameNew)
}

func replaceOccurrences(dir, fileNameOld, fileNameNew string) {
	files, err := ioutil.ReadDir(dir)
	if err != nil {
		log.Fatalf("cannot list files: %v\n", err)
	}
	for _, file := range files {
		ext := path.Ext(file.Name())
		if file.IsDir() || ext == ".png" || ext == ".tsv" || file.Name() == "Makefile" {
			continue
		}
		oldFileContentB, err := ioutil.ReadFile(path.Join(dir, file.Name()))
		if err != nil {
			log.Fatalf("cannot read file %q: %v", file.Name(), err)
		}
		oldFileContent := string(oldFileContentB)
		newFileContent := strings.ReplaceAll(oldFileContent, fileNameOld, fileNameNew)
		if oldFileContent == newFileContent {
			continue
		}
		newFilePath := path.Join(dir, file.Name())
		fmt.Printf("  - updating %s\n", newFilePath)
		err = ioutil.WriteFile(newFilePath, []byte(newFileContent), 0644)
		if err != nil {
			log.Fatalf("cannot write file %q: %v", file.Name(), err)
		}
	}
}

func parseArgs(argv []string) string {
	if len(os.Args) == 1 {
		fmt.Println("Usage: hash <filename>")
		os.Exit(1)
	}
	return os.Args[1]
}

func baseFileName(filename string) string {
	return filename[:len(filename)-len(path.Ext(filename))]
}

func findMatchingFileWithHashInName(fileNameClean string) string {
	fileExt := path.Ext(fileNameClean)
	pattern := fmt.Sprintf("%s*%s", baseFileName(fileNameClean), fileExt)
	matches, err := filepath.Glob(pattern)
	if err != nil {
		log.Fatalf("cannot find files matching %q: %v", pattern, err)
	}
	if len(matches) != 1 {
		fmt.Printf("found multiple matching files for %q: %v", fileNameClean, matches)
	}
	return matches[0]
}

func calculateFileNameWithUpdatedHash(fileNameClean, fileNameOld string) string {
	file, err := os.Open(fileNameOld)
	if err != nil {
		log.Fatal(err)
	}
	hash := md5.New()
	_, err = io.Copy(hash, file)
	if err != nil {
		log.Fatal(err)
	}
	file.Close()
	fullHash := fmt.Sprintf("%x", hash.Sum(nil))
	shortHash := fullHash[:4]
	return fmt.Sprintf("%s-%s%s", baseFileName(fileNameClean), shortHash, path.Ext(fileNameClean))
}
