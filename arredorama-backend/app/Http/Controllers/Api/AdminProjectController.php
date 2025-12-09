<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class AdminProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('created_at', 'desc')->get();
        return response()->json($projects);
    }

    public function store(Request $request)
    {
        Log::info('[ADMIN][PROJECT][STORE] request received', [
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'payload' => $request->except(['image']),
        ]);

        try {
            $rules = [
                'title' => 'required|string|max:255',
                'category' => 'required|string|max:100',
                'description' => 'nullable|string',
                'client' => 'nullable|string|max:255',
                'location' => 'nullable|string|max:255',
                'year' => 'nullable|string|max:10',
                // l'immagine può essere file o stringa (già presente): valida solo se è un file caricato
                'image' => 'nullable',
                'gallery.*' => 'image|max:5120', // Validazione per ogni file della gallery
            ];

            if ($request->hasFile('image')) {
                // Evita blocchi su mime detection (alcuni client inviano mime atipici). Accetta qualunque file fino a 5MB.
                $rules['image'] = 'file|max:5120';
                $file = $request->file('image');
                Log::info('[ADMIN][PROJECT][STORE] image upload detected', [
                    'original_name' => $file ? $file->getClientOriginalName() : null,
                    'mime' => $file ? $file->getMimeType() : null,
                    'size' => $file ? $file->getSize() : null,
                ]);
            }

            $validated = $request->validate($rules);

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = time() . '_' . $file->getClientOriginalName();

                // Backend: salva in public/images
                $targetDir = public_path('images');
                File::ensureDirectoryExists($targetDir);
                $file->move($targetDir, $filename);

                // Copia anche nel frontend per la modalità statica
                $frontendDir = base_path('../arredorama-frontend/src/assets/images/ARREDORAMA-SMALL');
                File::ensureDirectoryExists($frontendDir);
                $backendPath = $targetDir . DIRECTORY_SEPARATOR . $filename;
                $frontendPath = $frontendDir . DIRECTORY_SEPARATOR . $filename;
                if (file_exists($backendPath)) {
                    @copy($backendPath, $frontendPath);
                }

                // Percorso salvato in DB
                $validated['image'] = '/images/' . $filename;
            }

            // Gestione Gallery
            $galleryPaths = [];
            if ($request->hasFile('gallery')) {
                $files = $request->file('gallery');
                foreach ($files as $file) {
                    $filename = time() . '_' . uniqid() . '_' . $file->getClientOriginalName();
                    
                    // Backend: salva in public/images
                    $targetDir = public_path('images');
                    File::ensureDirectoryExists($targetDir);
                    $file->move($targetDir, $filename);

                    // Copia anche nel frontend per la modalità statica
                    $frontendDir = base_path('../arredorama-frontend/src/assets/images/ARREDORAMA-SMALL');
                    File::ensureDirectoryExists($frontendDir);
                    $backendPath = $targetDir . DIRECTORY_SEPARATOR . $filename;
                    $frontendPath = $frontendDir . DIRECTORY_SEPARATOR . $filename;
                    if (file_exists($backendPath)) {
                        @copy($backendPath, $frontendPath);
                    }

                    $galleryPaths[] = '/images/' . $filename;
                }
            }
            $validated['gallery'] = $galleryPaths;

            // Copia il path anche su image_url (colonna esistente non nullable)
            $validated['image_url'] = $validated['image'] ?? '';

            $project = Project::create($validated);

            Log::info('[ADMIN][PROJECT][STORE] success', ['project_id' => $project->id]);

            return response()->json([
                'message' => 'Progetto creato con successo',
                'project' => $project,
            ], 201);
        } catch (\Throwable $e) {
            Log::error('[ADMIN][PROJECT][STORE] error', [
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'message' => 'Errore nel salvataggio del progetto',
            ], 500);
        }
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

        Log::info('[ADMIN][PROJECT][UPDATE] request received', [
            'project_id' => $id,
            'ip' => $request->ip(),
            'payload' => $request->except(['image']),
        ]);

        try {
            $rules = [
                'title' => 'sometimes|required|string|max:255',
                'category' => 'sometimes|required|string|max:100',
                'description' => 'nullable|string',
                'client' => 'nullable|string|max:255',
                'location' => 'nullable|string|max:255',
                'year' => 'nullable|string|max:10',
                'image' => 'nullable',
                'gallery.*' => 'image|max:5120',
                'existing_gallery' => 'nullable|array',
                'existing_gallery.*' => 'string',
            ];

            if ($request->hasFile('image')) {
                // Accetta il file senza controllare il mime per evitare falsi negativi
                $rules['image'] = 'file|max:5120';
                $file = $request->file('image');
                Log::info('[ADMIN][PROJECT][UPDATE] image upload detected', [
                    'original_name' => $file ? $file->getClientOriginalName() : null,
                    'mime' => $file ? $file->getMimeType() : null,
                    'size' => $file ? $file->getSize() : null,
                ]);
            }

            $validated = $request->validate($rules);

            if ($request->hasFile('image')) {
                if ($project->image) {
                    $oldAbsolute = public_path(ltrim($project->image, '/'));
                    if (file_exists($oldAbsolute)) {
                        @unlink($oldAbsolute);
                    }
                }

                $file = $request->file('image');
                $filename = time() . '_' . $file->getClientOriginalName();

                // Backend: salva in public/images
                $targetDir = public_path('images');
                File::ensureDirectoryExists($targetDir);
                $file->move($targetDir, $filename);

                // Copia anche nel frontend per la modalità statica
                $frontendDir = base_path('../arredorama-frontend/src/assets/images/ARREDORAMA-SMALL');
                File::ensureDirectoryExists($frontendDir);
                $backendPath = $targetDir . DIRECTORY_SEPARATOR . $filename;
                $frontendPath = $frontendDir . DIRECTORY_SEPARATOR . $filename;
                if (file_exists($backendPath)) {
                    @copy($backendPath, $frontendPath);
                }

                $validated['image'] = '/images/' . $filename;
            }

            // Gestione Gallery
            // 1. Recupera immagini esistenti da mantenere
            $existingGallery = $request->input('existing_gallery', []);
            
            // 2. Identifica immagini rimosse per cancellarle dal disco
            $currentGallery = $project->gallery ?? [];
            $removedImages = array_diff($currentGallery, $existingGallery);
            
            foreach ($removedImages as $removedPath) {
                $absolutePath = public_path(ltrim($removedPath, '/'));
                if (file_exists($absolutePath)) {
                    @unlink($absolutePath);
                }
                // Nota: non cancelliamo dal frontend assets folder per sicurezza/semplicità, 
                // ma idealmente dovremmo farlo se vogliamo pulizia completa.
            }

            // 3. Aggiungi nuove immagini
            $newGalleryPaths = [];
            if ($request->hasFile('gallery')) {
                $files = $request->file('gallery');
                foreach ($files as $file) {
                    $filename = time() . '_' . uniqid() . '_' . $file->getClientOriginalName();
                    
                    $targetDir = public_path('images');
                    File::ensureDirectoryExists($targetDir);
                    $file->move($targetDir, $filename);

                    $frontendDir = base_path('../arredorama-frontend/src/assets/images/ARREDORAMA-SMALL');
                    File::ensureDirectoryExists($frontendDir);
                    $backendPath = $targetDir . DIRECTORY_SEPARATOR . $filename;
                    $frontendPath = $frontendDir . DIRECTORY_SEPARATOR . $filename;
                    if (file_exists($backendPath)) {
                        @copy($backendPath, $frontendPath);
                    }

                    $newGalleryPaths[] = '/images/' . $filename;
                }
            }

            // 4. Unisci esistenti mantenute + nuove
            $validated['gallery'] = array_merge($existingGallery, $newGalleryPaths);

            // Mantieni image_url allineato (colonna esistente non nullable)
            if ($request->hasFile('image')) {
                $validated['image_url'] = $validated['image'];
            } elseif (!isset($validated['image_url'])) {
                // Se non si carica nuova immagine, conserva quella esistente
                $validated['image_url'] = $project->image_url ?? ($project->image ?? '');
            }

            $project->update($validated);

            Log::info('[ADMIN][PROJECT][UPDATE] success', ['project_id' => $project->id]);

            return response()->json([
                'message' => 'Progetto aggiornato con successo',
                'project' => $project,
            ]);
        } catch (\Throwable $e) {
            Log::error('[ADMIN][PROJECT][UPDATE] error', [
                'project_id' => $id,
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'message' => 'Errore nell\'aggiornamento del progetto',
            ], 500);
        }
    }

    public function destroy($id)
    {
        $project = Project::find($id);
        
        if (!$project) {
            return response()->json(['message' => 'Progetto non trovato'], 404);
        }

        Log::info('[ADMIN][PROJECT][DELETE] request received', [
            'project_id' => $id,
        ]);

        try {
            if ($project->image) {
                $oldAbsolute = public_path(ltrim($project->image, '/'));
                if (file_exists($oldAbsolute)) {
                    @unlink($oldAbsolute);
                }
            }

            $project->delete();

            Log::info('[ADMIN][PROJECT][DELETE] success', ['project_id' => $id]);

            return response()->json([
                'message' => 'Progetto eliminato con successo',
            ]);
        } catch (\Throwable $e) {
            Log::error('[ADMIN][PROJECT][DELETE] error', [
                'project_id' => $id,
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'message' => 'Errore nell\'eliminazione del progetto',
            ], 500);
        }
    }
}