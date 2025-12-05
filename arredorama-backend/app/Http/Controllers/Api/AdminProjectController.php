<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('created_at', 'desc')->get();
        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'description' => 'nullable|string',
            'client' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:10',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        // Gestione upload immagine
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images'), $filename);
            $validated['image'] = '/images/' . $filename;
        }

        $project = Project::create($validated);

        return response()->json([
            'message' => 'Progetto creato con successo',
            'project' => $project,
        ], 201);
    }

    public function show($id)
    {
        $project = Project::find($id);
        
        if (!$project) {
            return response()->json(['message' => 'Progetto non trovato'], 404);
        }

        return response()->json($project);
    }

    public function update(Request $request, $id)
    {
        $project = Project::find($id);
        
        if (!$project) {
            return response()->json(['message' => 'Progetto non trovato'], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|string|max:100',
            'description' => 'nullable|string',
            'client' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:10',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        // Gestione upload nuova immagine
        if ($request->hasFile('image')) {
            // Elimina la vecchia immagine se esiste
            if ($project->image) {
                $oldImagePath = public_path($project->image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images'), $filename);
            $validated['image'] = '/images/' . $filename;
        }

        $project->update($validated);

        return response()->json([
            'message' => 'Progetto aggiornato con successo',
            'project' => $project,
        ]);
    }

    public function destroy($id)
    {
        $project = Project::find($id);
        
        if (!$project) {
            return response()->json(['message' => 'Progetto non trovato'], 404);
        }

        // Elimina l'immagine associata
        if ($project->image) {
            $imagePath = public_path($project->image);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }

        $project->delete();

        return response()->json([
            'message' => 'Progetto eliminato con successo',
        ]);
    }
}