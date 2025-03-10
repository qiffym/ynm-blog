<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Qiff Ya Muhammad',
            'email' => 'qiffym@admin.com',
            'password' => bcrypt('123'),
            'email_verified_at' => now(),
        ])->assignRole(Role::create([
            'name' => 'admin',
            'guard_name' => 'web'
        ]));
    }
}
