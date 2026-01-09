# Git Authentication Fix Guide

## Problem
- Repository: `rhrithick398-creator/faculty.git`
- Authenticated as: `hrithick05` (no permission)
- Error: 403 Permission Denied

## Solutions

### Option 1: Use Personal Access Token (Recommended)

1. **Create a Personal Access Token:**
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Name: "Faculty Dashboard"
   - Select scopes: `repo` (full control of private repositories)
   - Generate token and **COPY IT** (you won't see it again!)

2. **Use Token for Push:**
   ```powershell
   # When prompted for password, use the token instead
   git push origin main
   # Username: rhrithick398-creator
   # Password: [paste your token here]
   ```

3. **Or Update Remote URL with Token:**
   ```powershell
   git remote set-url origin https://[YOUR_TOKEN]@github.com/rhrithick398-creator/faculty.git
   ```

### Option 2: Use SSH Authentication

1. **Check if you have SSH key:**
   ```powershell
   ls ~/.ssh
   ```

2. **Generate SSH key if needed:**
   ```powershell
   ssh-keygen -t ed25519 -C "hrithickkrishna355@gmail.com"
   # Press Enter to accept default location
   # Set a passphrase (optional)
   ```

3. **Add SSH key to GitHub:**
   ```powershell
   # Copy your public key
   cat ~/.ssh/id_ed25519.pub
   # Copy the output
   ```
   - Go to GitHub → Settings → SSH and GPG keys → New SSH key
   - Paste your public key

4. **Update remote to use SSH:**
   ```powershell
   git remote set-url origin git@github.com:rhrithick398-creator/faculty.git
   ```

### Option 3: Use GitHub CLI

```powershell
# Install GitHub CLI if not installed
# Then authenticate
gh auth login
# Follow prompts to authenticate
```

### Option 4: Check Repository Access

Make sure your GitHub account (`hrithick05` or `rhrithick398-creator`) has access to the repository:
- Go to: https://github.com/rhrithick398-creator/faculty
- Check if you can see the repository
- If not, ask the owner to add you as a collaborator

## Quick Fix (Temporary)

If you just need to push once:
```powershell
git push https://[YOUR_TOKEN]@github.com/rhrithick398-creator/faculty.git main
```

## Verify Authentication

After setting up, test with:
```powershell
git push origin main
```

