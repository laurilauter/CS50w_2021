import random
from django import forms
from django.forms import TextInput
from django.shortcuts import render
import markdown2
from . import util



# global variables and formatting
# transfer entries to a new variable and set values to lowercase
entries = util.list_entries()
entries = [entries.lower() for entries in entries]

#Classes for Forms
class EntryForm(forms.Form):
    title = forms.CharField(widget=TextInput(attrs={'pattern':'[A-Za-z0-9]+'}))
    content = forms.CharField(widget=forms.Textarea)

class EditForm(forms.Form):
    title = forms.CharField()
    content = forms.CharField(widget=forms.Textarea)


# List all enties
def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

# Show single entries via URL, or error page if not found

def show_entry(request, title):
    #print(title.lower())
    #print(entries)
    if title.lower() in entries:
        return render(request, "encyclopedia/show_entry.html", {
            "title": title,
            "content": markdown2.markdown(util.get_entry(title)),
        })
    else:
        return render(request, "encyclopedia/error.html", {
            "phrase": title,
            "message": "Could not be found."
        })

def search(request):
    query = request.POST.get("q")
    query = query.lower()
    #print(query)
    #print(entries)
    #print(found_entries)
    #if direct match is found show it
    if query in entries:
        #print("if")
        return show_entry(request, query)
    #if partial match is found, show all entries that contain it
    else:
        #print("else")
        #print(found_entries)
        found_entries = [i for i in entries if query in i]
        return render(request, "encyclopedia/search.html", {
            "entries": found_entries,
            "query": query
        })




def new_entry(request):
    if request.method == "POST":
        #get data from EntryForm
        form = EntryForm(request.POST)
        if form.is_valid():
            title = form.cleaned_data["title"]
            #adds the title to the first line of content as on the example entries
            content = '#' + form.cleaned_data["title"] + '\n' + form.cleaned_data["content"]
            if title.lower() in entries:
                #if title exists, throws error
                return render(request, "encyclopedia/error.html", {
                    "phrase": title,
                    "message": "Already exists."
                })
            else:
                #passes data to util.save_entry
                util.save_entry(title, content)
                #adds title to original list
                util.list_entries().append(title)
                #adds title to additional list
                entries.append(title.lower())
                #show entry after save
                return render(request, "encyclopedia/show_entry.html", {
                    "title": title,
                    "content": markdown2.markdown(util.get_entry(title)),
                })
        #data is bad, send the user back to fix it
        else:
            return render(request, "encyclopedia/new.html", {
                "message": "Create a new entry",
                "form": form
            })
    #if method GET serve a fresh form
    else:
        return render(request, "encyclopedia/new.html", {
            "message": "Create a new entry",
            "form": EntryForm
        })



def random_page(request):
    #random page from entries
    return show_entry(request, random.choice(entries))

def edit_entry(request, title):
    #pull data from html form, if method POST
    form = EditForm(request.POST)
    #Load content into the form and display
    if request.method == "GET":
        content = util.get_entry(title)
        form = EditForm({'title': title, 'content': content})
        return render(request, "encyclopedia/edit.html", {
            "message": "Editing: " + title,
            "title": title,
            "form": form
            })
    #save edited data to file
    elif form.is_valid():
        title = form.cleaned_data["title"]
        content = form.cleaned_data["content"]
        #remove odd whitespace
        content = content.replace('\r', '')
        #send data to util.save_entry
        util.save_entry(title, content)
        #display saved page
        return render(request, "encyclopedia/show_entry.html", {
            "title": title,
            "content": markdown2.markdown(util.get_entry(title)),
        })
